<div class="well">
	<form class="form-horizontal">
		<div class="form-group">
			<label class="control-label col-xs-3" for="firstName">First Name:</label>
			<div class="col-xs-9">
				<input type="text" class="form-control" id="firstName" placeholder="First Name">
			</div>
		</div>

		<div class="form-group">
			<label class="control-label col-xs-3" for="postalAddress">Address:</label>
			<div class="col-xs-9">
				<textarea rows="3" class="form-control" id="postalAddress" placeholder="Postal Address"></textarea>
			</div>
		</div>

		<div class="form-group">
			<label class="control-label col-xs-3">Gender:</label>
			<div class="col-xs-2">
				<label class="radio-inline">
					<input type="radio" name="genderRadios" value="male"> Male
				</label>
			</div>
			<div class="col-xs-2">
				<label class="radio-inline">
					<input type="radio" name="genderRadios" value="female"> Female
				</label>
			</div>
		</div>

		<div class="form-group">
			<div class="col-xs-offset-3 col-xs-9">
				<label class="checkbox-inline">
					<input type="checkbox" value="news"> Send me latest news and updates.
				</label>
			</div>
		</div>

		<div class="form-group">
			<div class="col-xs-offset-3 col-xs-9">
				<label class="checkbox-inline">
					<input type="checkbox" value="agree">  I agree to the <a href="#">Terms and Conditions</a>.
				</label>
			</div>
		</div>
		<br>

		<div class="form-group">
			<div class="col-xs-offset-3 col-xs-9">
				<input type="submit" class="btn btn-primary" value="Submit">
				<input type="reset" class="btn btn-default" value="Reset">
			</div>
		</div>
	</form>
</div>