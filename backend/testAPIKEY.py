from openai import OpenAI

client = OpenAI(
    # If you haven't configured an environment variable, replace it with your Alibaba Cloud Bailian API Key：api_key="sk-xxx"
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

messages = [{"role": "system", "content": "You are a AI master, No nonsense"}, {"role": "user", "content": "who are you"}]
completion = client.chat.completions.create(
    model="qwen3.5-plus",  # model type
    messages=messages,
    extra_body={"enable_thinking": True},
    stream=True
)

is_answering = False  # if you want to get answers
print("\n" + "=" * 20 + "thought process" + "=" * 20)
for chunk in completion:
    delta = chunk.choices[0].delta
    if hasattr(delta, "reasoning_content") and delta.reasoning_content is not None:
        if not is_answering:
            print(delta.reasoning_content, end="", flush=True)
    if hasattr(delta, "content") and delta.content:
        if not is_answering:
            print("\n" + "=" * 20 + "full reply" + "=" * 20)
            is_answering = True
        print(delta.content, end="", flush=True)
