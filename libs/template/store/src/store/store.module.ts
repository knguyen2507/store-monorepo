import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { BrandEffects } from './brand';
import { brandFeatureKey, brandReducers } from './brand/state/brand.reducers';
import { CategoryEffects } from './category';
import { categoryFeatureKey, categoryReducers } from './category/state/category.reducers';
import { LoginEffects } from './login';
import { loginFeatureKey, loginReducers } from './login/state/login.reducers';
import { ParameterEffects } from './parameter';
import { parameterFeatureKey, parameterReducers } from './parameter/state/parameter.reducers';
import { ProductEffects } from './product';
import { productFeatureKey, productReducers } from './product/state/product.reducers';
import { ShopEffects } from './shop';
import { shopFeatureKey, shopReducers } from './shop/state/shop.reducers';
import { UserEffects } from './user';
import { userFeatureKey, userReducers } from './user/state/user.reducers';

interface State {}

const reducer: ActionReducerMap<State> = {};

const metaReducers: MetaReducer<State>[] = [];

const stores = [
  StoreModule.forFeature(productFeatureKey, productReducers),
  StoreModule.forFeature(parameterFeatureKey, parameterReducers),
  StoreModule.forFeature(brandFeatureKey, brandReducers),
  StoreModule.forFeature(categoryFeatureKey, categoryReducers),
  StoreModule.forFeature(loginFeatureKey, loginReducers),
  StoreModule.forFeature(userFeatureKey, userReducers),
  StoreModule.forFeature(shopFeatureKey, shopReducers),
];

const effects = [
  EffectsModule.forFeature([ProductEffects]),
  EffectsModule.forFeature([ParameterEffects]),
  EffectsModule.forFeature([BrandEffects]),
  EffectsModule.forFeature([CategoryEffects]),
  EffectsModule.forFeature([LoginEffects]),
  EffectsModule.forFeature([UserEffects]),
  EffectsModule.forFeature([ShopEffects]),
];

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducer, { metaReducers }),
    ...stores,
    ...effects,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    CommonModule,
  ],
})
export class AppStoreModule {}
