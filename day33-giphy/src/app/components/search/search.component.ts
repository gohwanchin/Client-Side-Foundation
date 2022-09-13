import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCriteria } from 'src/app/models';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form!: FormGroup
  numbers: number[] = new Array(6).fill(0).map((x,i)=>(i+1)*5)

  constructor(private fb: FormBuilder, private giphySvc: GiphyService) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  processForm(){
    const criteria: SearchCriteria = this.form.value as SearchCriteria
    this.giphySvc.search(criteria)
    .then(result => {
      console.log(result);
      this.saveAPIKey(criteria.api)
      this.giphySvc.onNewResult.next(result)
    }).catch(error => {
      console.error(`${JSON.stringify(error)}`);
    })
    this.form = this.createForm()
  }

  private createForm(){
    return this.fb.group({
      api: this.fb.control(this.getAPIKey(), [Validators.required]),
      search: this.fb.control('', [Validators.required]),
      results: this.fb.control(''),
      rating: this.fb.control('')
    })
  }

  private getAPIKey(): string{
    let key = localStorage.getItem('apiKey')
    if (!key)
      return ''
    return key
  }

  private saveAPIKey(key: string){
    localStorage.setItem('apiKey', key)
  }
}
