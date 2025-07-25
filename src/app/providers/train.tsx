import { inject } from 'mobx-react';
import { Component } from 'react';

import Controller from '../controllers/train';
import ViewModel from '../view-models/train';

@inject()
export default class Train extends Component {
    private readonly viewModel: ViewModel;

    constructor(props: any) {
        super(props);

        this.viewModel = new ViewModel();
    }

    render() {
        return <Controller viewModel={this.viewModel} />;
    }
}
