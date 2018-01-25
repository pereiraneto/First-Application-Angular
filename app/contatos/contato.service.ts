import {Injectable} from '@angular/core';
import {CONTATOS} from './contatos-mock';
import {Contato} from './contato.model';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';

@Injectable()
export class ContatoService{

    private contatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ){}

    getContatos(): Promise<Contato[]>{
        return this.http.get(this.contatosUrl)
            .toPromise() 
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    getContato(id: number): Promise<Contato>{
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }  

    create(contato: Contato): Promise<Contato>{
        return this.http.post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then((response: Response) => {
            console.log(response.json().data);
            return response.json().data as Contato;
        })
        .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`;
        return this.http
        .put(url, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`;
        return this.http
        .delete(url, {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }
    
    private handleError(err: any): Promise<any>{
        return Promise.reject(err.message || err);
    } 

    getContatosSlowly(): Promise<Contato[]>{
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        })
        .then(() => {
            console.log("primeiro then");
            return "Angular 2";
        })
        .then((param: string) => {
            console.log("segundo then");
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log("continuando ...");
                    resolve2();
                }, 4000);
            });
        })
        .then(() =>{
            console.log("terceiro then");
            return this.getContatos();
        });
    }

    search(term: string): Observable<Contato[]>{
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[]);
    }
}