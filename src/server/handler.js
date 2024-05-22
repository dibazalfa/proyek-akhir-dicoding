const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    try {
        const { label, suggestion } = await predictClassification(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            result: label,
            suggestion,
            createdAt
        };

        const response = h.response({
            status: 'success',
            message: 'Model is predicted successfully.',
            data
        });

        response.code(201);
        return response;
    } catch (error) {
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        }).code(400);
    }
}

module.exports = postPredictHandler;
