import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ModelingExercise } from './modeling-exercise.model';
import { ModelingExerciseService } from './modeling-exercise.service';
import { ArtemisMarkdown } from 'app/components/util/markdown.service';

@Component({
    selector: 'jhi-modeling-exercise-detail',
    templateUrl: './modeling-exercise-detail.component.html',
})
export class ModelingExerciseDetailComponent implements OnInit, OnDestroy {
    @Input() exercise: ModelingExercise;

    modelingExercise: ModelingExercise;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    problemStatement: SafeHtml | null;
    gradingInstructions: SafeHtml | null;
    sampleSolution: SafeHtml | null;
    sampleSolutionUML: SafeHtml | null;

    constructor(
        private eventManager: JhiEventManager,
        private modelingExerciseService: ModelingExerciseService,
        private route: ActivatedRoute,
        private artemisMarkdown: ArtemisMarkdown,
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInModelingExercises();
    }

    load(id: number) {
        this.modelingExerciseService.find(id).subscribe((modelingExerciseResponse: HttpResponse<ModelingExercise>) => {
            this.modelingExercise = modelingExerciseResponse.body!;
            this.problemStatement = this.artemisMarkdown.safeHtmlForMarkdown(this.modelingExercise.problemStatement);
            this.gradingInstructions = this.artemisMarkdown.safeHtmlForMarkdown(this.modelingExercise.gradingInstructions);
            this.sampleSolution = this.artemisMarkdown.safeHtmlForMarkdown(this.modelingExercise.sampleSolutionExplanation);
            this.sampleSolutionUML = JSON.parse(this.modelingExercise.sampleSolutionModel);
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModelingExercises() {
        this.eventSubscriber = this.eventManager.subscribe('modelingExerciseListModification', () => this.load(this.modelingExercise.id));
    }
}
