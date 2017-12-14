import chai from 'chai'
const should = require('chai').should();
import { bem } from '../index.js'

describe('BEM tests', () => {
  describe('Element tests', () => {
    it('should handle toString', () => { 
      bem('hello').toString().should.be.equal('hello')
    })

    it('should chain classes', () => { 
      bem('hello')('world').toString().should.be.equal('hello__world')
      bem('hello')('world')('and')('the')('rest').toString().should.be.equal('hello__world__and__the__rest')
    })
  })

  describe('Modifier tests', () => {
    it('should allow modifiers to be added', () => {
      bem('hi').mod('active').toString().should.be.equal('hi hi--active')
    })

    it('should drop modifiers when subsequent classes are added', () => {
      bem('hi').mod('active')('world').toString().should.be.equal('hi__world')
    })

    it('should allow modifiers to be passed in as BEMs', () => {
      bem('hi').mod(bem('active')).toString().should.be.equal('hi hi--active')
    })

    it('should allow multiple modifiers to be passed in in an array', () => {
      bem('hi').mod(['active', 'green', 'fart']).toString().should.be.equal('hi hi--active hi--green hi--fart')
    })

    it('should allow objects with boolean values to create modifiers', () => {
      const className = bem('hi').mod({active: true, green: true, fart: false}).toString()

      className.includes('hi ').should.be.true 
      className.includes(' hi--active').should.be.true 
      className.includes(' hi--green').should.be.true 
      className.includes(' hi--fart').should.false
    })
  })

  describe('And tests', () => {

    it('should allow classes to be added', () => {
      bem('hi').and('active').toString().should.be.equal('hi active')
    })

    it('should added classes when subsequent classes are added', () => {
      bem('hi').and('active')('world').toString().should.be.equal('hi__world')
    })

    it('should allow additional classes to be passed in as BEMs', () => {
      bem('hi').and(bem('active')).toString().should.be.equal('hi active')
    })

    it('should allow multiple classes to be passed in in an array', () => {
      bem('hi').and(['active', 'green', 'fart']).toString().should.be.equal('hi active green fart')
    })

    it('should allow objects with boolean values to create additional classes', () => {
      const className = bem('hi').and({active: true, green: true, fart: false}).toString()

      className.includes('hi ').should.be.true 
      className.includes(' active').should.be.true 
      className.includes(' green').should.be.true 
      className.includes(' fart').should.false
    })
  })

  describe('baseName', () => {
    it('should include the base name as a property', () => {
      bem('hi').baseName.should.be.equal('hi')
    })

    it('should chain base names', () => {
      bem('hi')('world').baseName.should.be.equal('hi__world')
    })

    it('should ignore ands or modifiers', () => {
      bem('hi')('world').mod('active').baseName.should.be.equal('hi__world')
      bem('hi')('world').and('active').baseName.should.be.equal('hi__world')
      bem('hi')('world').and('active').mod({active: true, disabled: true, farts: true}).baseName.should.be.equal('hi__world')
    })
  })
})
