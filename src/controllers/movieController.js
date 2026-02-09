import * as movieModel from '../models/movieModel.js';

const genreValid = [
    'Ação',
    'Drama',
    'Comédia',
    'Terror',
    'Romance',
    'Animação',
    'Ficção Científica',
    'Suspense',
];

export const getAll = async (req, res) => {
    try {
        const { title, genre, available, minRating, maxDuration } = req.query;

        const filters = { title, genre, available, minRating, maxDuration };

        const movies = await movieModel.findAll(filters);

        //valida genero
        if (genre) {
            const genreBusca = genre.toLowerCase().trim();

            const naoEncontrado = !genreValid.some((g) =>
                g.toLocaleLowerCase().includes(genreBusca),
            );

            if (naoEncontrado) {
                return res.status(400).json({
                    status: 400,
                    error: 'Gênero (genre) inválido',
                    suggestion: 'Procure por um dos gêneros (genre) válidos',
                    genreValid,
                });
            }
        }

        if (!movies || movies.length === 0) {
            return res.status(404).json({
                status: 404,
                sucess: false,
                message: 'Nenhum filme encontrado.',
            });
        }

        res.status(200).json({
            status: 200,
            sucess: true,
            total: movies.length,
            message: 'Lista de filmes (movies) disponíveis',
            filters,
            movies,
        });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({
            error: 'Erro ao buscar filmes',
            details: error.message,
            status: 500,
        });
    }
};

export const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        const { title, description, duration, genre, rating, available } = req.body;

        if (!title || title.trim().length < 3) return res.status(400).json({
            error: 'O título (title) é obrigatório e deve ter no mínimo 3 caracteres!'
        });
        if (!description || description.trim().length < 10) return res.status(400).json({
            error: 'A descrição (description) é obrigatória e deve conter no mínimo 3 caracteres!'
        });


        const data = await model.create({
            nome,
            descricao,
            ano: parseInt(ano),
            preco: parseFloat(preco),
        });

        res.status(201).json({
            message: 'Registro cadastrado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar o registro.' });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                status: 400,
                success: false,
                error: 'O ID enviado não é um número válido.'
            });
        }

        const data = await movieModel.findById(id);
        if (!data) {
            return res.status(404).json({
                status: 404,
                sucess: false,
                message: 'Nenhum filme encontrado.',
            });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({
            error: 'Erro ao buscar filmes',
            details: error.message,
            status: 500,
        });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        const data = await model.update(id, req.body);
        res.json({
            message: `O registro "${data.nome}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await model.remove(id);
        res.json({
            message: `O registro "${exists.nome}" foi deletado com sucesso!`,
            deletado: exists,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }
};
