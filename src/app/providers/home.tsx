import { inject } from 'mobx-react';
import { Component } from 'react';

import Controller from '../controllers/home';
import ViewModel from '../view-models/home';

@inject()
export default class Home extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {
        return <Controller viewModel={this.viewModel} />;
    }
}
