const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/users');


describe('Users model', () => {
    // add
    it('should add user', async () => {
        const theUser = await User.getById(1);
        console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
        console.log(theUser);
        console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
        const newUser = await User.add(theUser);
        expect(newUser).to.be.instanceOf(Object);
    });

    // delete
    it('should delete user by id', async () => {
        const noLongerTheUser = await User.delete(7)
        console.log(noLongerTheUser)
        const theUser = await User.getById(7)
        expect(theUser).to.be.null;
    });

    // getAll
    it('should grab all from users', async () => {
        const allUsers = await User.getAll();
        console.log(allUsers);
        expect(allUsers).to.be.instanceOf(Array);
    });

    // getByEmail
    it('should be able to retreive all by email', async () => {
        const theUser = await User.getByEmail('Chris@trau.co');
        console.log(theUser)
        expect(theUser).to.be.instanceOf(Object);
    });

    // getById
    it('should be able to retreive by id', async () => {
        const theUser = await User.getById(2)
        console.log(theUser);
        theUser.should.be.an.instanceOf(User);
    });

    // error for getById if id doesn't exist
    it('should error if there is no user by id', async () => {
        const theUser = await User.getById(43193);
        console.log(theUser);
        expect(theUser).to.be.null;
        // const whatever = await Users.functionName;
        // whatever.should.be.an.instanceOf(something);
    });

    // setPassword
    it('should encrypt the password', async () => {
        const password = 'apples'
        const theUser = await User.getById(1);
        console.log(theUser);
        theUser.setPassword('apple');
        expect(theUser.password).not.to.equal('apple')
    });

    // checkPassword
    it('should be able to check if password is correct', async () => {
        const theUser = await User.getById(3)
        console.log(theUser)
        theUser.setPassword('apples')

        await theUser.save();

        const sameUser = await User.getById(3);

        const isCorrectPassword = sameUser.checkPassword('apples');
        expect(isCorrectPassword).to.be.true;

        const isNotTheCorrectPassword = sameUser.checkPassword('notapples');
        expect(isNotTheCorrectPassword).to.be.false;
    });

});




// describe('Comments model', () => {
//     it('', async () => {
//         // const whatever = await Users.functionName;
//         // whatever.should.be.an.instanceOf(something);
//     });
// });