declare module Type {

    interface IngredientObj {
        [key: string]: string | number;
    }

    interface Ingredient {
        name: string;
        quantity: string | number;
    }

    interface Recipe {
        alcohols: Ingredient[];
        other: Ingredient[];
    }

    export interface CoveoResponse {
        apiVersion: number;
        duration: number;
        groupByResults: any[];
        index: string;
        indexDuration: number;
        indexToken: string;
        phrasesToHighlight: {
            pipeline: string;
        };
        queryCorrections: any[];
        refinedKeywords: any[];
        requestDuration: number;
        results: Result[];
        searchUid: string;
        termsToHighlight: {};
        totalCount: number;
        totalCountFiltered: number;
        triggers: any[];
    }

    export interface Result {
        // ClickUri: string;
        // Excerpt: string;
        // FirstSentences: string;
        // PrintableUri: string;
        // Title: string;
        // UniqueId: string;
        // Uri: string;
        childResults: any[];
        clickUri: string;
        excerpt: string;
        excerptHighlights: any[];
        firstSentences: any;
        firstSentenceHighlights: any[];
        flags: string;
        hasHtmlVersion: boolean;
        hasMobileHtmlVersion: boolean;
        isRecommendation: boolean;
        isTopResult: boolean;
        parentResult: any;
        percentScore: number;
        printableUrl: string;
        printableUriHighlights: any[];
        rankingInfo: any;
        rating: number;
        raw: Raw;
        score: number;
        summary: any;
        summaryHighlights: any[];
        title: string;
        titleHighlights: string[];
        totalNumberOfChildResults: number;
        uniqueId: string;
        uri: string;
    }

    export interface Raw {
        sysclickableuri: string;
        syscollection: string;
        sysconcepts: string;
        sysdate: number;
        sysdocumenttype: string;
        sysfiletype: string;
        sysfolders: string;
        sysindexeddate: number;
        syslanguage: string;
        sysprintableuri: string;
        sysrowid: number;
        syssite: string;
        syssize: number;
        syssource: string;
        syssourcetype: string;
        systitle: string;
        systopparent: string;
        systopparentid: number;
        sysuri: string;
        sysurihash: string;
        tpbouchon: string;
        tpcategorie: string;
        tpcategorieraw: string;
        tpcodecup: string;
        tpcodesaq: string;
        tpcontenant: string;
        tpcouleur: string;
        tpcoveoconnectorhasbinarydata: string;
        tpdisponibilite: string;
        tpformat: string;
        tpnomdebouteille: string;
        tppagebody: HTMLElement;
        tppagetitle: string;
        tppays: string;
        tpprixbande: string;
        tpprixnormal: string;
        tpprixnum: number;
        tpproducteur: string;
        tpregion: string;
        tpthumbnailuri: string;
        urihash: string;
    }

    export interface SelectedAlcohol {
        name: string;
        selected: Result;
    }
}
