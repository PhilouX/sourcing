export class Startup {

    constructor(
    contact: string,
    country: string,
    creation_date: string,
    descriptif: string,
    entreprise: string,
    funds: number,
    id: number,
    keywords: Array<string>,
    mail: string,
    target: Boolean,
    url: string
    ) {}

static fromJsonList(array): Startup[] {
    return array.map(Startup.fromJson);
    }

static fromJson({ contact, country, creation_date, descriptif, entreprise, 
                   funds, id, keywords, mail, target, url }): Startup {
    return new Startup(
            contact, 
            country, 
            creation_date, 
            descriptif, 
            entreprise, 
            funds, 
            id, 
            keywords, 
            mail, 
            target, 
            url);
    }
}
