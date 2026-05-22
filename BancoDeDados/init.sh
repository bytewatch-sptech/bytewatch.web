# docker network create bytewatch-net
# docker network inspect bytewatch-net

docker build -t imagem_bd .

docker run -d -p 3306:3306 --name bytewatch_db --network bytewatch-net imagem_bd