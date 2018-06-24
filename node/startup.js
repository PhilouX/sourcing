class Startup {
    constructor(entreprise, country, descriptif, keywords, url) {
        this.country = country;
        this.descriptif = descriptif;
        this.entreprise = entreprise;
        this.keywords = keywords;
        this.url = url;

    }
}
module.exports = Startup;
/*
const test = new Startup("Paul", "France", "2009", "blablabla", "Company", 5, 9, "AI", "p.ef@d.com", false, "www.google.com")

console.log(test)
*/