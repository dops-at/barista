/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  LitElement,
  html,
  css,
  customElement,
  TemplateResult,
  CSSResult,
  internalProperty,
} from 'lit-element';

import '@dynatrace/fluid-elements/button';
import '@dynatrace/fluid-elements/checkbox';
import '@dynatrace/fluid-elements/design-system-provider';
// tslint:disable-next-line: no-duplicate-imports
import { FluidCheckboxChangeEvent } from '@dynatrace/fluid-elements/checkbox';

import './loading-spinner';

@customElement('metadata-upload-confirmation')
export class MetadataUploadConfirmationComponent extends LitElement {
  static get styles(): CSSResult {
    return css`
      fluid-design-system-provider {
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--color-background);
        color: var(--color-maxcontrast);
      }
    `;
  }

  /** @internal Whether the user has already clicked "publish" */
  @internalProperty() _publishing: boolean = false;

  /** @internal Whether the user has clicked the acknowledge checkbox */
  @internalProperty() _acknowledged: boolean = false;

  render(): TemplateResult {
    if (this._publishing) {
      return html`<loading-spinner />`;
    } else {
      return html`
        <fluid-design-system-provider>
          <p>Before you continue, make sure that</p>
          <ul>
            <li>you're in the original Design Tokens document</li>
            <li>
              <em>all</em> the design tokens have been synchronized and show up
              as styles in the right bar.
            </li>
          </ul>
          <strong>
            This will overwrite the current remote style data, so wrong data
            would causing theme switching to break everywhere. If the design
            tokens have changed, you'll also have to publish the Figma library
            (you can do this after running this after clicking "Upload").
          </strong>

          <p>
            <fluid-checkbox
              id="acknowledge-check"
              @change="${this._handleAcknowledgeChange}"
            />
            <label for="acknowledge-check"
              >I acknowledge the above points</label
            >
          </p>

          <div>
            <fluid-button
              @click="${this._handleConfirm}"
              ?disabled="${!this._acknowledged}"
              emphasis="high"
              >Upload</fluid-button
            >
            <fluid-button @click="${this._handleCancel}">Cancel</fluid-button>
          </div>
        </fluid-design-system-provider>
      `;
    }
  }

  private _handleAcknowledgeChange(event: FluidCheckboxChangeEvent): void {
    this._acknowledged = event.checked;
  }

  private _handleConfirm(): void {
    this.dispatchEvent(new CustomEvent('confirm'));
    this._publishing = true;
  }

  private _handleCancel(): void {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
}
