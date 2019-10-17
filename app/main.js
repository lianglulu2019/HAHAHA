import React from 'react';
import Dva from 'dva';

import App from './App.js';
import counterModel from './models/counterModel.js';
import escModel from './models/escModel.js';

// 创建app
const app = Dva();

// 需要有路由，今天下午学路由，现在写死
app.router(() => <App />);

// 应用模型
app.model(counterModel);
app.model(escModel);

// 需要上树运行
app.start('#app');

