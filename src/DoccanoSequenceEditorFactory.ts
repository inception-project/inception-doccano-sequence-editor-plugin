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
import { DoccanoSequenceEditor } from "./DoccanoSequenceEditor";

const PROP_EDITOR = "__editor__";

export class DoccanoSequenceEditorFactory /* implements AnnotationEditorFactory */ {
  async getOrInitialize(element: HTMLElement | string, diam /*: DiamClientFactory */, props /*: AnnotationEditorProperties */): Promise<DoccanoSequenceEditorFactory> {
    element = this.resolveElement(element);

    const ajax = diam.createAjaxClient(props.diamAjaxCallbackUrl);
    element[PROP_EDITOR] = new DoccanoSequenceEditor(element, ajax);
    return element[PROP_EDITOR];
  }

  destroy(element: HTMLElement | string): void {
    element = this.resolveElement(element);

    if (element[PROP_EDITOR] != null) {
      element[PROP_EDITOR].destroy();
      console.log('Destroyed editor');
    }
  }

  private resolveElement(element: HTMLElement | string): HTMLElement {
    if (!element) {
      throw "No element given.";
    }

    let actualElement = element;

    if (!(actualElement instanceof HTMLElement)) {
      actualElement = document.getElementById(actualElement)
    }

    if (!actualElement) {
      throw `Could not find an element with the id ${element}`;
    }

    return actualElement;
  }
}