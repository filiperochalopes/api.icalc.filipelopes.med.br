import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const drugs = await tx.drug.findMany();

    for (const d of drugs) {
      // Verifica se já existe um volume correspondente ao medicamento
      if (d.volume) {
        const volume = await tx.drugVolume.findUnique({
          where: {
            value: d.volume,
          },
        });

        if (volume) {
          // Se o volume já existe, faz a atualização ligando o volume ao medicamento
          await tx.drug.update({
            where: { id: d.id },
            data: {
              volumes: { connect: { id: volume.id } },
            },
          });
        } else {
          // Caso não exista, cria um novo volume e relaciona ao medicamento
          const newVolume = await tx.drugVolume.create({
            data: {
              value: d.volume,
            },
          });

          await tx.drug.update({
            where: { id: d.id },
            data: {
              volumes: { connect: { id: newVolume.id } },
            },
          });
        }
      }
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
