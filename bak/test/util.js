import {expect} from 'chai'

describe('array params', function () {
    it('passed, retrieved', () => {
        const toto = ([r, t]) => r + t
        expect(toto(["r", "t"])).to.equal("rt")
    })
})