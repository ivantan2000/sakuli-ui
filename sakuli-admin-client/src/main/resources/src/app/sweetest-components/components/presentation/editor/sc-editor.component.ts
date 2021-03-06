import {
  AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output,
  ViewChild
} from "@angular/core";
import * as ace from 'brace';
import 'brace';
import 'brace/theme/chrome';
import 'brace/mode/javascript';
import 'brace/mode/properties';
import 'brace/mode/dockerfile';
import 'brace/mode/yaml';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {EditorModes} from "./editor-modes.interface";

const noop = (_: any) => {};

@Component({
  selector: 'sc-editor',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ScEditorComponent),
    multi: true
  }],
  template: `
    <ng-content select="nav.navbar.top"></ng-content>
    <pre [id]="id" class="editor" #editorEl></pre>
    <ng-content select="nav.navbar.bottom"></ng-content>
  `,
  styles: [`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .editor {
      width: 100%;
      flex-grow: 1;
      margin: 0;
    }
  `]
})
export class ScEditorComponent implements AfterViewInit, ControlValueAccessor {

  _editor: ace.Editor;

  onChange = noop;
  onTouched = noop

  @ViewChild('editorEl') editorEl: ElementRef;

  @Output() change = new EventEmitter<any>();

  @Input() mode: string = 'javascript';


  get editor() {
    return this._editor;
  }

  get value() {
    return this.editor.getValue();
  }

  private static instanceCounter = 0;

  id = `sc-editor-instance-${ScEditorComponent.instanceCounter++}`;

  set value(v: any) {
    if (v !== undefined && this.editor) {
      this.editor.setValue(v);
      this.onChange(v);
    }
  }

  ngOnInit() {
    if(EditorModes.indexOf(this.mode) === -1) {
      throw Error(`Invalid mode ${this.mode} please check if the mode is defined in ${module.id}`)
    }
  }

  ngAfterViewInit() {
    this._editor = ace.edit(this.id);
    this.editor.setTheme(`ace/theme/chrome`);
    this.editor.session.setMode(`ace/mode/${this.mode}`);
    this.editor.$blockScrolling = Infinity;
    this.editor.setValue("");
    this.editor.on('change', e => this.change.next(e));
    this.change.subscribe(_ => this.onChange(this.editor.getValue()));
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }


}

