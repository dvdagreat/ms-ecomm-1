# Define output directory
OUT_DIR="./libs/protos"
mkdir -p ${OUT_DIR} # Create the output directory if it doesn't exist

# Run protoc with ts-proto plugin
protoc \
  --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=${OUT_DIR} \
  --ts_proto_opt=onlyTypes=true,useReadonlyTypes=true,useJsonWireFormat=true \
  --proto_path=./protos \
  ./protos/*.proto
  
# protoc \
#   --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
#   --ts_proto_out=${OUT_DIR} \
#   --ts_proto_opt=esModuleInterop=true,forceLong=string,outputServices=grpc-js,nestJs=true \
#   --proto_path=./proto \
#   ./protos/*.proto
