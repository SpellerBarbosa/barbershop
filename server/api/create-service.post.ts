import Service from '../models/servicesSchema';
import connectToDB from '../utils/connectToDB';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { service, price, userId } = body;

    await connectToDB();

    try {
        if (!service || !price || !userId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Todos os campos são obrigatorios ',
            });
        }

        const serviceExist = await Service.findOne({ service });

        if (serviceExist) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Esse serviço ja foi cadastrado.',
            });
        }

        const newService = new Service({
            service: service.toLowerCase().trim(),
            price: price,
            userId: userId,
        });

        await newService.save();

        return{ message: "Serviço cadastrado com sucesso!" }

    } catch (error: any) {
        if (error.statusCode) throw error;

        console.error(error);

        throw createError({
            statusCode: 500,
            statusMessage:
                'Erro ao se conectar ao servidor, tente novamente mais tarde.',
        });
    }
});
