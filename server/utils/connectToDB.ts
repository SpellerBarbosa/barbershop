import mongoose from "mongoose";

const connectToDB = async () =>{
    const uri: string | undefined = process.env.URI

    if(uri === undefined){
        throw new Error("Variavel de ambiente nao foi definida")
    }

    try {
        await mongoose.connect(uri,{
            dbName:'barbeariaDb',
            serverSelectionTimeoutMS: 5000
        })
    } catch (error) {
        if(error instanceof Error){
            console.error(`Erro ao se conectar ao servidor, ${error.message}`);
        }else{
            console.error(`Error desconhecido, ${error}`);
        }
        throw error;
    }
}

export default connectToDB;