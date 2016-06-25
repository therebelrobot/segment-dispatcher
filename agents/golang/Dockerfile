FROM golang

ADD . /go/src/github.com/therebelbeta/go-docker-sim
RUN go get github.com/labstack/echo
RUN go get github.com/labstack/echo/engine/standard
RUN go install github.com/therebelbeta/go-docker-sim

ENTRYPOINT /go/bin/go-docker-sim

EXPOSE 8001
