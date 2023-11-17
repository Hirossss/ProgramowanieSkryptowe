from Others import Subject, AGH_Scale


class Grade:
    def __init__(self, subject: Subject, agh_scale: AGH_Scale):
        self.subject = subject
        self.agh_scale = agh_scale
