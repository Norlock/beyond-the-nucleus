export interface Resources {
    init(): void;
    cleanup(): void;
}

export interface ResourcesModule {
    resources: Resources;
}
