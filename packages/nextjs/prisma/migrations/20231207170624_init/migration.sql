-- CreateTable
CREATE TABLE "Points" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "points" INTEGER DEFAULT 0,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Points_address_key" ON "Points"("address");
