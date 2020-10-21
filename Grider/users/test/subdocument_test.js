const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'PostTitle'}]
    });

    joe.save()
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
    });
  });

    it('can add subdocuments to an existing user', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                user.posts.push({ title: 'New Post'})
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
           });
        });
        console.log("user can add a subdocument to an existing user");
})