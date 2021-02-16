import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao: string = 'Translate the phrase to portuguese:';
  public resposta: string = '';
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() { 
    this.atualizaRodada();
    // console.log(this.rodadaFrase);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
    //console.log(this.resposta);
  }

  public verificarResposta(): void {

    if(this.rodadaFrase.frasePtBr == (this.resposta)){
      
      // trocar pergunta da rodada
      this.rodada++;

      //progresso
      this.progresso += (100/this.frases.length);

      if(this.rodada === 4) {
        this.encerrarJogo.emit('vitoria');
      }

      this.atualizaRodada();

    } else {
      // diminuir a variavel tentativas
      this.tentativas--;

      if(this.tentativas < 0) {
        this.encerrarJogo.emit('derrota');
      }
    }
    
  }

  public atualizaRodada(): void {
    // atualiza o objeto rodadaFrase
    this.rodadaFrase = this.frases[this.rodada];

    // limpar a resposta
    this.resposta = '';
  }

}