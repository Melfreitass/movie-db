import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.movie.createMany({
        data: [
            {
                title: 'Mad Max: Estrada da Fúria',
                description:
                    'Em um futuro pós-apocalíptico, Max se une a Furiosa para fugir de um tirano.',
                duration: 120,
                genre: 'Ação',
                rating: 8.10,
                available: true,
            },
            {
                title: 'O Poderoso Chefão',
                description: 'A saga da família Corleone no submundo da máfia italiana.',
                duration: 175,
                genre: 'Drama',
                rating: 10.00,
                available: true,
            },
            {
                title: 'As Branquelas',
                description: 'Dois agentes se disfarçam para impedir um sequestro.',
                duration: 109,
                genre: 'Comédia',
                rating: 5.80,
                available: true,
            },
            {
                title: 'Invocação do Mal',
                description: 'Investigadores paranormais enfrentam uma presença demoníaca.',
                duration: 112,
                genre: 'Terror',
                rating: 7.50,
                available: true,
            },
            {
                title: 'Titanic',
                description: 'Um romance que nasce a bordo do navio mais famoso da história.',
                duration: 195,
                genre: 'Romance',
                rating: 7.90,
                available: true,
            },
            {
                title: 'Toy Story',
                description: 'Os brinquedos ganham vida quando os humanos não estão por perto.',
                duration: 81,
                genre: 'Animação',
                rating: 8.30,
                available: true,
            },
            {
                title: 'Interestelar',
                description: 'Uma missão espacial para salvar o futuro da humanidade.',
                duration: 169,
                genre: 'Ficção Científica',
                rating: 8.60,
                available: true,
            },
            {
                title: 'Ilha do Medo',
                description:
                    'Um agente investiga o desaparecimento de uma paciente em um hospital psiquiátrico.',
                duration: 138,
                genre: 'Suspense',
                rating: 8.20,
                available: true,
            },
            {
                title: 'John Wick',
                description: 'Um ex-assassino volta à ativa após uma perda pessoal.',
                duration: 101,
                genre: 'Ação',
                rating: 7.40,
                available: true,
            },
            {
                title: 'Coringa',
                description: 'A origem sombria de um dos vilões mais icônicos do cinema.',
                duration: 122,
                genre: 'Drama',
                rating: 8.40,
                available: true,
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
