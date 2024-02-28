-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulation" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "carId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,

    CONSTRAINT "Simulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_cpf_key" ON "Lead"("cpf");

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
