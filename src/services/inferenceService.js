const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        const classes = ['Cancer', 'Non-cancer'];

        const prediction = model.predict(tensor);
        const score = await prediction.data();

        const cancerProbability = score[0];
        const label = cancerProbability > 0.5 ? 'Cancer' : 'Non-cancer';

        let suggestion;

        if (label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }

        if (label === 'Non-cancer') {
            suggestion = "Tetap jaga kesehatan Anda dengan baik!"
        }

        return { label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`)
    }
}

module.exports = predictClassification;