const { ethers } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("Should start with a favorite number of 0.", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        assert.equal(currentValue.toString(), expectedValue)
        // expect
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should add a new person to the array", async function () {
        const newPersonName = "Pau"
        const newPersonFavoriteNumber = "4"
        const transactionResponse = await simpleStorage.addPerson(
            newPersonName,
            newPersonFavoriteNumber
        )
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.people(0)
        assert.equal(
            currentValue.toString(),
            `${newPersonFavoriteNumber},${newPersonName}`
        )
    })
})
