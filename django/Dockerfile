# Usando como base image do Python 3.6
FROM python:3.6
ENV PYTHONUNBUFFERED 1

# Cria um diretório 'code' na raiz do container
RUN mkdir /code
WORKDIR /code

# Copia arquivo requirements.txt pro diretório '/code' e instala dependencias descritas nele
ADD requirements.txt /code/
RUN pip install -r requirements.txt

# Copia código desta pasta para '/code' no container
ADD . /code/
