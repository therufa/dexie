import { PrismaClient } from '@prisma/client';
import data from './cards.json';

const prisma = new PrismaClient();

async function main() {
    const allCards = data.cards.map(card => prisma.card.upsert({
        where: {
            id: card.id
        },
        update: {
            keywordIds: card.keywordIds,
        },
        create: {
            id: card.id,
            collectible: Boolean(card.collectible),
            slug: card.slug,
            classId: card.classId ?? 0,
            multiClassIds: card.multiClassIds,
            minionTypeId: card.minionTypeId ?? 0,
            cardTypeId: card.cardTypeId,
            cardSetId: card.cardSetId,
            rarityId: card.rarityId,
            health: card.health ?? 0,
            attack: card.attack ?? 0,
            manaCost: card.manaCost,
            artistName: card.artistName,
            name: card.name,
            text: card.text,
            flavorText: card.flavorText,
            image: card.image,
            imageGold: card.imageGold,
            cropImage: card.cropImage ?? '',
            parentId: card.parentId,
            childIds: card.childIds,
            tier: card.battlegrounds.tier,
            hero: card.battlegrounds.hero,
            quest: card.battlegrounds.quest,
            reward: card.battlegrounds.reward,
            upgradeId: card.battlegrounds.upgradeId,
            companionId: card.battlegrounds.companionId,
        }
    }));

    console.log(`Seeding cards...`);
    const cardTransaction = await prisma.$transaction(allCards)
    console.log(`Seeded ${cardTransaction.length} cards`);
}
main()
    .then(() => prisma.$disconnect())
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })