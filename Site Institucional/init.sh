# docker network create bytewatch-net
# docker network inspect bytewatch-net

docker build -t imagem_site .

docker run -d -p 8080:3333 --name bytewatch_web --network bytewatch-net imagem_site

