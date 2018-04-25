
const superagent = require('supertest');
const app = require('../../dist/app.js');

function request() {
    return superagent(app.listen());
}

describe('Nodeuii Service 自动化测试脚本', function () {
    describe('API接口测试', function () {
        it('获取数据接口列表', function (done) {
            request()
                .get('/data/getinfos')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (res.body.length === 4) {
                        done();
                    } else {
                        done(err);
                    }
                });
        });
    });
    describe('Nodeuii 容错测试', function() {
        it('404错误测试', function(done) {
            request()
                .get('/notfound')
                .expect(404, done);
        });
    });
});
