import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe {

  constructor(private sanitized: DomSanitizer) { }
  transform(value : any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
