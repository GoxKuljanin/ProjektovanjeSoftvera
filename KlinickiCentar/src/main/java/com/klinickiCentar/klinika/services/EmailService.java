package com.klinickiCentar.klinika.services;

import java.util.Collection;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.klinickiCentar.klinika.models.AdministratorKlinike;
import com.klinickiCentar.klinika.models.Pregled;
import com.klinickiCentar.klinika.models.User;

@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private Environment env;
	
	@Async
	public void sendNotification(User u) throws MailException, InterruptedException, MessagingException{
	
		String htmlView = "<html> <a href='http://localhost:4200/activateAccount/" + u.getId() + "'> Potvrdite link za aktivaciju naloga. </a> </html>";
		
		MimeMessage message = javaMailSender.createMimeMessage();
		
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setTo(u.getUsername());
		helper.setSubject("Klinicki Centar");
		helper.setText(htmlView, true);
		
		javaMailSender.send(message);
	}
	
	@Async
	public void pregledNotificationLekarPacijent(Pregled p, String lekar, String pacijent) throws MailException, InterruptedException, MessagingException{
	
		String text = "Pregled je zakazan za " + p.getTermin().getDatum()+ " u "+ p.getTermin().getVreme() + ", sala " + p.getSala().getName() + " " + p.getSala().getBrojsale();
		
		MimeMessage lekarMessage = javaMailSender.createMimeMessage();
		
		MimeMessageHelper lekarHelper = new MimeMessageHelper(lekarMessage, true);
		lekarHelper.setTo(lekar);
		lekarHelper.setSubject("Zakazan pregled:");
		lekarHelper.setText(text, false);
		
		javaMailSender.send(lekarMessage);
		MimeMessage pacijentMessage = javaMailSender.createMimeMessage();
		
		MimeMessageHelper pacijentHelper = new MimeMessageHelper(pacijentMessage, true);
		pacijentHelper.setTo(pacijent);
		pacijentHelper.setSubject("Zakazan pregled:");
		pacijentHelper.setText(text, false);
		
		javaMailSender.send(pacijentMessage);
	}
	
	@Async
	public void odbijZahtev(String poruka, String email) throws MailException, InterruptedException, MessagingException{
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(email);
		mail.setFrom(env.getProperty("spring.mail.username"));
		mail.setSubject("Zahtev Odbijen");
		mail.setText(poruka);
		javaMailSender.send(mail);

	}
	
	@Async
	public void obavestiAdmine( List<AdministratorKlinike> admini) throws MailException, InterruptedException, MessagingException{
		for(AdministratorKlinike a:admini) {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(a.getUser().getUsername());
		mail.setFrom(env.getProperty("spring.mail.username"));
		mail.setSubject("Zahtev za zakazivanje");
		mail.setText("Novi zahtev za zakazivanje");
		javaMailSender.send(mail);
		}
		
	}

}
