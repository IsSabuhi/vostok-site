from django.db import models

class Participants(models.Model):
    participants_name = models.CharField('Имя', max_length=50)
    participants_surname = models.CharField('Фамилия', max_length=50)
    participants_middleName = models.CharField('Отчество', max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.participants_surname} {self.participants_name} {self.participants_middleName} {self.phone}"

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'

class Coupon(models.Model):
    coupon_number = models.CharField('Номер купона', max_length=50, unique=True)
    is_used = models.BooleanField(default=False)
    participant_id = models.ForeignKey(Participants, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.coupon_number} {self.is_used}"
    
    class Meta:
        verbose_name = 'Купоны'
        verbose_name_plural = 'Купоны'