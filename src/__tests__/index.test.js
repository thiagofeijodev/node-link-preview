const nock = require('nock');
const LinkPreview = require('../index');

describe('node-link-previewer', () => {
  const testUrl = 'https://example.com';

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return title, description, img, and link for a valid URL', (done) => {
    // Mock HTML response
    const html = `
      <html>
        <head>
          <title>Example Domain</title>
          <meta property="og:description" name="description" content="This is an example.">
          <meta property="og:image" content="https://example.com/image.png">
        </head>
        <body>Example</body>
      </html>
    `;

    nock('https://example.com').get('/').reply(200, html);

    LinkPreview.search(testUrl, (data) => {
      expect(data).toEqual({
        title: 'Example Domain',
        description: 'This is an example.',
        img: 'https://example.com/image.png',
        link: testUrl,
      });
      done();
    }, done);
  });

  it('should handle missing meta tags gracefully', (done) => {
    const html = `
      <html><head><title>No Meta</title></head><body></body></html>
    `;
    nock('https://example.com').get('/').reply(200, html);

    LinkPreview.search(testUrl, (data) => {
      expect(data.title).toBe('No Meta');
      expect(data.description).toBeDefined();
      expect(data.img).not.toBeDefined();
      done();
    }, done);
  });

  it('should throw an error for invalid URL', (done) => {
    LinkPreview.search('not-a-url', done, (err) => {
      expect(err).toBeUndefined();
      done();
    });
  });

  it('should handle network errors', (done) => {
    nock('https://example.com').get('/').replyWithError('Network failure');

    LinkPreview.search(testUrl, done, (err) => {
      expect(err).not.toBeUndefined();
      expect(err.message).toContain('Network failure');
      done();
    });
  });
});
