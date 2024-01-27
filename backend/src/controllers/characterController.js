import asyncHandler from 'express-async-handler'
import { getCharacter, getCharacters } from 'rickmortyapi';

const getAllByPage = asyncHandler(async (req, res) => {
    const page = req.query.page || 1
    const response =  (await getCharacters({ page: page })).data || {}

    res.json({
        status: 'success',
        results: response.results,
        info: response.info
    })
})

const getById = asyncHandler(async (req, res) => {
    const id = Number(req.params.id) || null
    if (!id || typeof id !== 'number') {
        res.status(400)
        throw new Error('Invalid character id')
    }

    const character =  (await getCharacter(id)).data || {}
    res.json({
        status: 'success',
        result: character
    })
})

export { getAllByPage, getById }