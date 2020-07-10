import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ComputingNodesQuantityData } from 'src/app/models/computing-nodes-quantity-data';
import { RestartConfigurationService } from 'src/app/services/restart-configuration.service';

@Component({
  selector: 'app-node-quantity-form',
  templateUrl: './node-quantity-form.component.html',
  styleUrls: ['./node-quantity-form.component.css']
})
export class NodeQuantityFormComponent implements OnInit {
  @Output() quantityOfComputingNodes = new EventEmitter<ComputingNodesQuantityData>();

  public numOfClouds = 0;
  public numOfFogs = 0;
  public numOfComputingNodes: FormGroup;
  public maxNumOfNodes = 10;

  constructor(private formBuilder: FormBuilder, public restartConfService: RestartConfigurationService) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.numOfComputingNodes = this.formBuilder.group({
      numOfClouds: new FormControl('', [
        Validators.required,
        Validators.max(this.maxNumOfNodes),
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      numOfFogs: new FormControl('', [Validators.max(this.maxNumOfNodes)])
    });
  }

  public sendCloudAmouts() {
    const cloudsAmount = {
      numberOfClouds: this.numOfComputingNodes.get('numOfClouds').value,
      numberOfFogs: this.numOfComputingNodes.get('numOfFogs').value
        ? this.numOfComputingNodes.get('numOfFogs').value
        : undefined
    } as ComputingNodesQuantityData;
    this.quantityOfComputingNodes.emit(cloudsAmount);
  }

  public resetConfiguration() {
    this.numOfComputingNodes.reset();
    this.restartConfService.restartConfiguration$.next(true);
  }
}
