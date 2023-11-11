/*
 * Licensed to the Technische Universität Darmstadt under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The Technische Universität Darmstadt 
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.
 *  
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AnnotationEditor, DiamAjax, Offsets } from '@inception-project/inception-js-api';
import Vue from 'vue'
import DoccanoEditorComponent from './components/DoccanoEditorComponent.vue'

const ANNOTATIONS_SERIALIZER = "Brat";

export class DoccanoSequenceEditor implements AnnotationEditor {
  private ajax: DiamAjax;
  private editor: Vue;

  public constructor(element: HTMLElement, ajax: DiamAjax) {
    this.ajax = ajax;

    this.editor = new Vue({
      el: element,
      render: createElement => {
        const context = {
          props: { diam: ajax },
        };
        return createElement(DoccanoEditorComponent, context);
      },
    });
  }

  scrollTo(args: { offset: number; position?: string; pingRanges?: Offsets[]; }): void {
    console.info("Scroll-to not implemented")
  }

  public loadAnnotations(): void {
    this.ajax.loadAnnotations({format: ANNOTATIONS_SERIALIZER})
      .then(a => {
        console.log("Loaded " + a.length + " annotations from server");
        (this.editor.$children[0] as any).data = a; // VERY BAD HACK - need to figure out how to do it
      });
  }

  public destroy(): void {
    this.editor.$destroy();
  }
}