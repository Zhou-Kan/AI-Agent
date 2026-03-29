import streamlit as st

# web title
st.title("Knowledge Base Update Service")

#file_uploader
uploader_file = st.file_uploader(
    label="Plese update TXT file",
    type=['txt'],
    accept_multiple_files=False,  # False means it accepts only one file
)

if uploader_file is not None:
    # extract file information
    file_name = uploader_file.name
    file_type = uploader_file.type
    file_size = uploader_file.size / 1024 # KB

    st.subheader(f"File Name: {file_name}")
    st.write(f"Type: {file_type} | size: {file_size: .2f} KB")

    # get_value -> bytes -> decode('utf-8')
    text = uploader_file.getvalue().decode("utf-8")
    st.write(text)