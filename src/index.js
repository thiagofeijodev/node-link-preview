const request = require("request")
const cheerio = require("cheerio");

class LinkPreview {
	search(link, success, err) {
		if (!this.isValidURL(link)) {
			err();
      return;
		}

		request(link, function (error, _, html) {
			if (error) {
        return err(error);
      }

      const $ = cheerio.load(html);

      const titleTag = $("title").text();
      const titleMeta = $('meta[property="og:title"]').attr("content");
      const title = !titleMeta ? titleTag : titleMeta;

      const img = $('meta[property="og:image"]').attr("content");

      const descriptionMeta = $('meta[property="og:description"]').attr("content");
      const descriptionTag = $('meta[property="description"]').text();
      const description = !descriptionMeta ? descriptionTag : descriptionMeta;

      success({ img: img, title: title, description: description, link });
		});
	}

	isValidURL(str) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +                       // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' +             // OR IPv4
      '(\\:\\d+)?' +                              // optional port
      '(\\/[-a-z\\d%_.~+]*)*' +                   // path
      '(\\?[;&a-z\\d%_.~+=-]*)?' +                // query string
      '(\\#[-a-z\\d_]*)?$','i'                    // fragment
    );
		return pattern.test(str);
	}
}

module.exports = new LinkPreview();
