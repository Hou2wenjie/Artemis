import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrionButtonComponent } from 'app/shared/orion/orion-button/orion-button.component';
import { MomentModule } from 'ngx-moment';
import { OrionConnectorService } from 'app/shared/orion/orion-connector.service';
import { ModalConfirmAutofocusComponent } from './modal-confirm-autofocus/modal-confirm-autofocus.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrionFilterDirective } from './orion-filter.directive';
import { OrionBuildAndTestService } from 'app/shared/orion/orion-build-and-test.service';
import { FeatureToggleModule } from 'app/shared/feature-toggle/feature-toggle.module';
import { ArtemisSharedModule } from 'app/shared/shared.module';

export function initOrionConnector(connector: OrionConnectorService) {
    return () => OrionConnectorService.initConnector(connector);
}

@NgModule({
    declarations: [OrionButtonComponent, ModalConfirmAutofocusComponent, OrionFilterDirective],
    entryComponents: [ModalConfirmAutofocusComponent],
    imports: [CommonModule, ArtemisSharedModule, MomentModule, TranslateModule, FeatureToggleModule],
    exports: [OrionButtonComponent, OrionFilterDirective],
    providers: [{ provide: APP_INITIALIZER, useFactory: initOrionConnector, deps: [OrionConnectorService], multi: true }, OrionBuildAndTestService],
})
export class OrionModule {}
