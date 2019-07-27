import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Poem, PoemsService } from '../core';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  poem: Poem = {} as Poem;
  poemForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private poemsService: PoemsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // use the FormBuilder to create a form group
    this.poemForm = this.fb.group({
      title: '',
      description: '',
      body: ''
    });

    // Initialized tagList as empty array
    this.poem.tagList = [];

    // Optional: subscribe to value changes on the form
    // this.poemForm.valueChanges.subscribe(value => this.updatePoem(value));
  }

  ngOnInit() {
    // If there's an poem prefetched, load it
    this.route.data.subscribe((data: { poem: Poem }) => {
      if (data.poem) {
        this.poem = data.poem;
        this.poemForm.patchValue(data.poem);
      }
    });
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.poem.tagList.indexOf(tag) < 0) {
      this.poem.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.poem.tagList = this.poem.tagList.filter(tag => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updatePoem(this.poemForm.value);

    // post the changes
    this.poemsService.save(this.poem).subscribe(
      poem => this.router.navigateByUrl('/poem/' + poem.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updatePoem(values: Object) {
    Object.assign(this.poem, values);
  }
}
