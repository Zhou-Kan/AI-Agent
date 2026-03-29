import os
import redis
import config_data as config
import hashlib
from langchain_chroma import Chroma
from langchain_community.embeddings import DashScopeEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from datetime import datetime

redis_client = redis.Redis(
    host='localhost',
    port=6379,
    db=0,
    decode_responses=True
)
MD5_KEY = "knowledge_base_md5"

def check_md5(md5_str: str) -> bool:
    # Check if md5 exists
    return redis_client.sismember(MD5_KEY, md5_str)

def save_md5(md5_str: str) -> None:
    # save md5 in redis
    redis_client.sadd(MD5_KEY, md5_str)

def get_string_md5(input_str: str, encoding='utf-8'):
    # convert string to md5 string

    # convert data to bytes
    str_bytes = input_str.encode(encoding=encoding)

    # create md5
    md5_obj = hashlib.md5()     # Get md5
    md5_obj.update(str_bytes)   
    md5_hex = md5_obj.hexdigest()      

    return md5_hex

class KnowledgeBaseService(object):
    def __init__(self):
        # Check if the file fold exists
        os.makedirs(config.persist_directory, exist_ok=True)

        self.chroma = Chroma(
            collection_name=config.collection_name,     # the name of db
            embedding_function=DashScopeEmbeddings(model="text-embedding-v4"),
            persist_directory=config.persist_directory,     # the local db folder
        )     

        self.spliter = RecursiveCharacterTextSplitter(
            chunk_size=config.chunk_size,       
            chunk_overlap=config.chunk_overlap,    
            separators=config.separators,      
            length_function=len,               
        )    

    def upload_by_str(self, data: str, filename) -> str:
        md5_hex = get_string_md5(data)
        print(md5_hex)
        if check_md5(md5_hex):
            return "[Skipped] Content already exists in the knowledge base."

        if len(data) > config.max_split_char_number:
            knowledge_chunks = self.spliter.split_text(data)
        else:
            knowledge_chunks = [data]

        metadata = {
            "source": filename,
            "create_time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "operator": "Andy",
        }

        self.chroma.add_texts(
            knowledge_chunks,
            metadatas=[metadata for _ in knowledge_chunks],
        )

        save_md5(md5_hex)

        return "[Success] Content has been successfully loaded into the vector database."


if __name__ == '__main__':
    service = KnowledgeBaseService()
    r = service.upload_by_str("Jay222", "testfile")
    print(r)