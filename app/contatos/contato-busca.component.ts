import { Component, EventEmitter, OnInit, OnChanges, Output, Input, SimpleChange, SimpleChanges } from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Contato} from './contato.model';
import {ContatoService} from './contato.service';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover{
            cursor:pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {

    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<any> = new Subject<any>();
    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.contatos = this.termosDaBusca
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(term => {
                return term ? this.contatoService.search(term): Observable.of<Contato[]>([]);
            }).catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            }); 
    }

    ngOnChanges(changes: SimpleChanges): void{
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(termo: string): void {
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void{
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}