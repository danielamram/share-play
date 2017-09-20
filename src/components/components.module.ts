import { NgModule } from '@angular/core';
import { GroupComponent } from './group/group';
import { SearchComponent } from './search/search';
@NgModule({
	declarations: [GroupComponent,
    SearchComponent],
	imports: [],
	exports: [GroupComponent,
    SearchComponent]
})
export class ComponentsModule {}
