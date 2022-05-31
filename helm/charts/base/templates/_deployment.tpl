{{- define "base.deployment.tpl" -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: '{{ .Values.name }}'
  labels:
    app: '{{ .Values.name }}'
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: '{{ .Values.name }}'
  template:
    metadata:
      {{- with .Values.podAnnotations }}
      annotations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      labels:
        app: '{{ .Values.name }}'
    spec:
      {{- with .Values.image.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      serviceAccountName: default
      containers:
        - name: '{{ .Values.name }}'
          {{- if hasKey .Values.secrets "GCP" }}
          lifecycle:
            postStart:
              exec:
                command:
                  - /bin/sh
                  - -c
                  - cp /var/secrets/GCP /var/gcp-secret 
          {{- end }}
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          {{- if hasKey .Values "config" }}
          envFrom:
          - configMapRef:
              name: '{{ .Values.name }}'
          - secretRef:
              name: '{{ .Values.name }}'
          {{- end }}
          env: 
            - name: ENVIRONMENT
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
          {{- if hasKey .Values "securityContext" }}
          securityContext:
          {{- with .Values.securityContext -}}
          {{- toYaml . | nindent 12 }}
          {{- end }}
          {{- end }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- if  hasKey .Values "service" }}
          ports:
            - containerPort: {{ .Values.service.port.target }}
          {{- end }}
      {{- if hasKey .Values "volume" }}
          volumeMounts:
            - name: {{ .Values.volume.name }}
              mountPath: {{ .Values.volume.path }}
            - name: {{ .Values.volume.name }}-secret
              mountPath: "/var/secrets"
              readOnly: true
      volumes:
        - name: {{ .Values.volume.name }}
          persistentVolumeClaim:
            claimName: {{ .Values.pvc.name }}
        {{- if hasKey .Values "secrets" }}
        - name: {{ .Values.volume.name }}-secret
          secret:
            secretName: {{ .Values.name }}
        {{- end }}
      {{- end }}
{{- end -}}
{{- define "base.deployment" -}}
{{- include "base.util.merge" (append . "base.deployment.tpl") -}}
{{- end -}}