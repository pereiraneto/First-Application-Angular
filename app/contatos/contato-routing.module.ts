import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContatosListaComponent} from './contatos-lista.component';
import {ContatoDetalheComponent} from './contato-detalhe.component';

const contatosRoutes: Routes = [
    {
        path: 'contato',
        component: ContatosListaComponent

    }, 
    {
        path: 'contato/save',
        component: ContatoDetalheComponent
    },
    {
        path: 'contato/save/:id',
        component: ContatoDetalheComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(contatosRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ContatoRoutingModule{

}